var _ = require('lodash');
var express = require('express');
var router = express.Router();
var ItemCtrl = require('./item.controller');

function _serviceReq(req, method, paramName) {
    var ctrl = new ItemCtrl();
    var param;
    if (paramName) {
        param = _.get(req, paramName);
    }
    return ctrl[method](param);
}

router
    .route('/')
    .get(function(req, res, next) {
        _serviceReq(req, 'index')
            .then(function(payload) {
                res.status(200).json(payload);
            }).catch(next);
    })
    .put(function(req, res, next) {
        _serviceReq(req, 'add', 'body.item')
            .then(function(payload) {
                res.status(201).json(payload);
            }).catch(next);
    });

module.exports = router;

