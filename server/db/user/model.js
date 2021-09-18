const mongoose = require('mongoose');
const states = require('./state');

function init_model() {
  /**
   * @type {mongoose.Schema<user_t, user_model_t>}
   */
  const schema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 20
    },
    display: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 20
    },
    state: {
      type: Number,
      default: states.NORMAL
    },
    last_login: Date,
    created: {
      type: Date,
      default: Date.now
    }
  });

  schema.methods.can_play = function can_play() {
    return this.state == states.NORMAL;
  };

  schema.methods.update_display = function update_display(display) {
    this.display = display;
    this.save();
  };

  schema.methods.update_password = function update_password(password) {
    this.password = password;
    this.save();
  };

  schema.methods.login = function login() {
    /**
     * @type {secret_payload_t}
     */
    const payload = {
      _id: String(this._id),
      name: this.name,
      last_login: new Date()
    };
    this.last_login = payload.last_login;
    this.save();
    return payload;
  };

  schema.statics.pre_login = async function pre_login(name, password) {
    /**
     * @type {user_t}
     */
    const user = await this.findOne({ name });
    if (user == null)
      return null;
    if (user.password == password)
      return user;
    return false;
  };

  schema.statics.validate_display = function validate_display(name, password) {
    const { ban_names } = require('../../../utils/bans');
    let is_valid = true;
    for (const ban_name of ban_names) {
      if (name.includes(ban_name)) {
        is_valid = false;
        break;
      }
    }
    return is_valid;
  };

  return mongoose.model('User', schema);
}

const User = init_model();

module.exports = User;

/**
 * @typedef {import('./state').user_state_t} user_state_t
 * @typedef {mongoose.Document & user} user_t
 * @typedef {mongoose.Model<user_t> & user_model} user_model_t
 *
 * @typedef {object} secret_payload_t
 * @property {string} _id
 * @property {string} name
 * @property {Date} last_login
 *
 * @typedef {object} user
 * fields stored in database
 * @property {string} name
 * @property {string} display
 * @property {string} password this field should be encrypted
 * @property {user_state_t} state
 * @property {Date} last_login
 * @property {Date} created
 * member functions
 * @property {() => boolean} can_play
 * @property {(value: string) => void} update_display
 * @property {(value: string) => void} update_password
 * @property {() => secret_payload_t} login
 *
 * @typedef {object} user_model
 * @property {(name: string, password: string)
 *  => Promise<user_t | false>} pre_login
 * @property {(value: string) => void} validate_display
 */