String.prototype.unicodesplit = function() {
    var _stringarr = new Array(),
        _going = true,
        _strindex = 0,
        _arrmodify = {
            add: function(str) {
                _stringarr[_stringarr[_strindex] ? ++_strindex : _strindex] = str;
            },
            edit: function(str) {
                _stringarr[_strindex] = _stringarr[_strindex] ? _stringarr[_strindex] + _unicode : str;
            }
        }

    for (var i = 0; i < this.length; i++) {
        var _code = this.charCodeAt(i),
            _point = this.codePointAt(i),
            _unicode = String.fromCharCode(_code),
            _special = [0x200d, 0xfe0e, 0xfe0f, 0x1f3fb, 0x1f3fc, 0x1f3fd, 0x1f3fe, 0x1f3ff];

        if (_special.indexOf(_point) > -1) {
            _arrmodify.edit(_unicode);
        } else {
            if (_going) {
                _arrmodify.add(_unicode);
            } else {
                _arrmodify.edit(_unicode);
            }
        }
        _going = !(_point === 0x200d || _point > _code);
    }
    return _stringarr;
};
