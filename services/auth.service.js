const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const nodemailer = require('nodemailer');

const UserService = require('./user.service');
const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      // In login, we keep the error because we need to stop the process
      throw boom.unauthorized(); 
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token
    };
  }

  async sendRecovery(email){
    const user = await service.findByEmail(email);
     // SECURITY FIX: Instead of throwing boom.notFound, we return early.
    // This keeps the router clean and avoids the 404 error.
    if (!user) {
      return { message: 'If an account exists, a recovery email has been sent' };
    }
    const payload = {
      sub: user.id,
      type: 'recovery'
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `http://myfrontend.com/recovery?token=${token}`;
    // update user with recovery token
    await service.update(user.id, { recoveryToken: token });
  const mail = {
    from: `"Andres" <${config.MAIL_USER}>`,
    to: `${user.email}`,
    subject: "Password Recovery",
    html: `<b>Recupera tu contraseña siguiendo este enlace =></b><br><a href="${link}">Recovery Link</a>`,
    }
    const rta = await this.sendMail(mail);
    return rta;
  }


  async resetPassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      if (payload.type !== 'recovery') {
        throw boom.unauthorized();
      }
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {
        password: hash,
        recoveryToken: null
      });
      return { message: 'Password changed successfully' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail) {
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.MAIL_USER, // Using config object for consistency
        pass: config.MAIL_PASS  // Using config object for consistency
      }
    });
   try {
      // Intentamos enviar el correo
      await transporter.sendMail(infoMail);
    } catch (error) {
      // LOGUEAMOS EL ERROR PARA NOSOTROS (para saber por qué falló)
      console.error("Error al enviar email, pero enviamos 200 al cliente:", error.message);
      
      // NO LANZAMOS EL ERROR (no hacemos throw). 
      // Simplemente dejamos que la función termine.
    }

    // Al no haber error (porque lo atrapamos arriba), 
    // el router recibirá esto y responderá con 200 OK.
    return { message: 'If an account exists, a recovery email has been sent' };
  }
}

module.exports = AuthService;