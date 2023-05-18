"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
var Roles;
(function (Roles) {
    Roles[Roles["admin"] = 1] = "admin";
    Roles[Roles["mentor"] = 2] = "mentor";
    Roles[Roles["participant"] = 3] = "participant";
    Roles[Roles["editor_pir"] = 4] = "editor_pir";
    Roles[Roles["editor_shb"] = 5] = "editor_shb";
})(Roles = exports.Roles || (exports.Roles = {}));
//admin is uniqe for now and added manuel not programmatically
//mentor -> when a group is created
//editor_pir -> when assinged a chapter of pir to an user
