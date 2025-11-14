

import {Request,Response,NextFunction} from 'express'

import User from '../models/User'
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken'
