import User from '../models/User';

import CloudiNaryConfig from '../../config/cloudinaryConfig';
import Notification from '../models/Notification';
require('dotenv').config();

CloudiNaryConfig;

class NotificationController {
  async store(req, res) {
    const { sender_id, receiver_id } = req.params;
    try {
      const { id, sender_name, receiver_name, type } = req.body;

      const createNotification = await Notification.create({
        id,
        sender_id,
        sender_name,
        receiver_id,
        receiver_name,
        viewed: false,
        type,
      });

      return res.status(201).json(createNotification);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ erro: err });
    }
  }

  async index(req, res) {
    try {
      const findNotifications = await Notification.findAll({
        order: [['created_at', 'DESC']],
        where: {
          receiver_id: req.userId,
        },
      });
      if (!findNotifications)
        return res.status(400).json({ error: 'No one notification was found' });

      return res.status(200).json(findNotifications);
    } catch (err) {
      console.log(err);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      await Notification.update(
        {
          viewed: true,
        },
        { where: { id: id } }
      );

      return res.status(200).json();
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
}

export default new NotificationController();
