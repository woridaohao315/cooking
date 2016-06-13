'use strict'

const toString = Object.prototype.toString

function type(obj) {
  return toString.call(obj)
}

exports.string = obj => type(obj) === '[object String]'
exports.array = obj => type(obj) === '[object Array]'
exports.object = obj => type(obj) === '[object Object]'
exports.boolean = obj => type(obj) === '[object Boolean]'
