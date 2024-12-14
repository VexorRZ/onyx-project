import User from '../models/User';
import Friend from '../models/Friend';

class FriendController {
  async create(req, res) {
    const { friend_id, user_id } = req.params;

    const userExists = await User.findOne({
      where: {
        id: user_id,
      },
    });
    if (!userExists)
      return res.status(400).json({ error: 'User does not exists' });

    console.log('chegou aqui no friendRequest');

    const friendExists = await User.findOne({
      where: {
        id: friend_id,
      },
    });
    if (!friendExists)
      return res.status(400).json({ error: 'User does not exists' });

    const friendRequestExists = await Friend.findOne({
      where: {
        user_id: userExists.id,
        friend_id: friendExists.id,
      },
    });

    if (friendRequestExists) {
      if (!friendRequestExists.accepted) {
        return res.status(400).json({
          error: 'this request already has bem sent. Await for the response',
        });
      } else if (friendRequestExists.accepted) {
        return res
          .status(400)
          .json({ error: 'this person is already your friend' });
      }
    } else {
      const newFriendRequest = await Friend.create({
        user_id: user_id,
        friend_id: friend_id,
      });
      return res.status(201).json(newFriendRequest);
    }
  }

  async delete(req, res) {
    const { group_id, user_id } = req.params;
    const user = await User.findByPk(user_id);
    const group = await Group.findByPk(group_id);

    const isMember = await Group.findByPk(group_id, {
      include: {
        association: 'members',
        where: { id: user_id },
      },
    });
    if (!isMember)
      return res
        .status(400)
        .json({ error: 'User is not a member of this group' });

    const isAdministrator = await Group.findOne({
      where: { id: group_id, owner_id: req.userId },
    });

    const isModerator = await Group.findOne({
      where: { id: group_id },
      include: [
        {
          association: 'moderators',
          where: { id: req.userId },
        },
      ],
    });

    if (!isAdministrator && !isModerator)
      return res.status(401).json({
        error:
          ' Invalid action. Only the group admin or moderators can remove bans.',
      });

    if (user.id === req.userId)
      return res.status(401).json({ error: 'you can not remove yourself' });

    if (isModerator) {
      const moderatorBeingBanned = await Group.findOne({
        where: { id: group_id },
        include: {
          association: 'moderators',
          where: { id: user.id },
        },
      });
      if (moderatorBeingBanned)
        return res
          .status(401)
          .json({ error: 'A moderator can not remove another moderator.' });
    }

    if (user.id === isAdministrator.owner_id)
      return res
        .status(401)
        .json({ error: 'Not permitted to remove the group owner.' });

    await group.removeMember(user);

    return res.status(200).json({ msg: 'User successfully removed' });
  }
}

export default new FriendController();
