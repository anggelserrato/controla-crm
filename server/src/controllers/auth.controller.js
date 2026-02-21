import * as authService from '../services/auth.service.js';

export const loginUser = async (req, res, next) => {
  try {
    const { user, token } = await authService.login(req.body);
    res.json({
      success: true,
      message: 'Login exitoso',
      data: { user, token },
    });
  } catch (err) {
    next(err);
  }
};
