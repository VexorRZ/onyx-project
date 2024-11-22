/* eslint-disable prettier/prettier */
import { Router } from 'express';

import SendMailController from './app/controllers/SendMailController';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import GroupController from './app/controllers/GroupController';
import GroupModeratorsController from './app/controllers/GroupModeratorsController';
import GroupMembersController from './app/controllers/GroupMembersController';
import GroupBansController from './app/controllers/GroupBansController';
import TopicController from './app/controllers/TopicController';
import CommentController from './app/controllers/CommentController';
import RequestEntryController from './app/controllers/GroupsRequestsEntrysController';
import FileControler from './app/controllers/FileController';
import CommentsLikesController from './app/controllers/CommentsLikesController';
import authMiddleware from './app/middlewares/auth';
import multer from 'multer';
import multerConfig from './config/multer';
import FileGroupController from './app/controllers/FileGroupController';
import NotificationController from './app/controllers/NotificationController';
import UserPublicationController from './app/controllers/UserPublicationController';
import PublicationCommentController from './app/controllers/PublicationCommentController';

const routes = new Router();

// Session Routes
routes.post('/sessions', SessionController.store);
routes.get('/reset_password/:id/:token', SessionController.resetPassword);
routes.post('/forgot_password', SessionController.forgotPassword);
routes.post('/reset_password_confirm', SessionController.confirmResetPassword);
routes.post('/users', UserController.store);
routes.post('/mail', SendMailController.sendmail);

// users routes

routes.use(authMiddleware);
//files routes
routes.put('/files', multer(multerConfig).single('file'), FileControler.store);

routes.patch(
  '/files_groups/:group_id',
  multer(multerConfig).single('file'),
  FileControler.store
);

routes.get(
  '/files_groups/:group_avatar_id',
  multer(multerConfig).single('file'),
  FileGroupController.store
);

routes.patch(
  '/files_comments',
  multer(multerConfig).single('file'),
  FileControler.store
);

// users routes
routes.get('/users/:name', UserController.index);
routes.get('/users/:user_id', UserController.show);
routes.put(
  '/users/:user_id',
  multer(multerConfig).single('file'),
  UserController.update
);
routes.delete('/users/:user_id', UserController.delete);

// groups routes
routes.post(
  '/groups',
  multer(multerConfig).single('file'),
  GroupController.create
);
routes.get('/groups', GroupController.index);
routes.get('/groups/:group_id', GroupController.show);
routes.delete('/groups/:group_id', GroupController.delete);
routes.put(
  '/groups/:group_id',
  multer(multerConfig).single('file'),
  GroupController.update
);

// groupsModerators routes
routes.post(
  '/groupsmoderators/:group_id/:user_id',
  GroupModeratorsController.create
);
routes.get('/groupsmoderators/:group_id', GroupModeratorsController.index);
routes.get(
  '/groupsmoderators/:group_id/:user_id',
  GroupModeratorsController.show
);
routes.delete(
  '/groupsmoderators/:group_id/:user_id',
  GroupModeratorsController.delete
);

// groupsMembers routes
routes.post('/groupsmembers/:group_id/:user_id', GroupMembersController.create);
routes.get('/groupsmembers/:group_id/:user_id', GroupMembersController.show);
routes.get('/groupsmembers/:group_id', GroupMembersController.index);
routes.delete(
  '/groupsmembers/:group_id/:user_id',
  GroupMembersController.delete
);

// groupsBansController routes
routes.post('/groupsbans/:group_id/:user_id', GroupBansController.create);
routes.get('/groupsbans/:group_id', GroupBansController.index);
routes.get('/groupsbans/:group_id/:user_id', GroupBansController.show);
routes.delete('/groupsbans/:group_id/:user_id', GroupBansController.delete);

// RequestEntrys
routes.post('/request_entry/:group_id', RequestEntryController.create);
routes.get('/request_entry/:group_id', RequestEntryController.index);
routes.delete(
  '/request_entry/:group_id/:user_id',
  RequestEntryController.delete
);
routes.put('/request_entry/:group_id/:user_id', RequestEntryController.update);

// topics routes
routes.post('/topics/:group_id', TopicController.create);
routes.get('/:group_id/topics', TopicController.index);
routes.get('/topics/:group_id/:topic_id', TopicController.show);
routes.delete('/topics/:group_id/:topic_id', TopicController.delete);
routes.put('/topics/:group_id/:topic_id', TopicController.update);

// Comments routes
routes.post(
  '/comments/:group_id/:topic_id',

  CommentController.create
);
routes.get('/comments/:group_id/:topic_id', CommentController.index);
routes.get('/comments/:group_id/:topic_id/:comment_id', CommentController.show);
routes.put(
  '/comments/:group_id/:topic_id/:comment_id',
  CommentController.update
);
routes.delete(
  '/comments/:group_id/:topic_id/:comment_id',
  CommentController.delete
);

//CommentLikes routes
routes.put(
  '/comments_likes/:author_id/:comment_id',
  CommentsLikesController.createOrUpdate
);

//Publications routes

routes.post('/publication', UserPublicationController.create);

routes.get('/publications', UserPublicationController.index);

// Publications comments routes

routes.post(
  '/publication_comment/:publication_id',
  PublicationCommentController.create
);

//Notifications routes

routes.post(
  '/notifications/:sender_id/:receiver_id',
  NotificationController.store
);
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

export default routes;
