String.prototype.toArray = function(system, prefix) {
    var unicodesplit = function() {
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
                _special = [0x200d, 0x200c, 0xfe0e, 0xfe0f, 0x1f3fb, 0x1f3fc, 0x1f3fd, 0x1f3fe, 0x1f3ff];

            if (_special.indexOf(_point) > -1) {
                _arrmodify.edit(_unicode);
            } else {
                if (_going) {
                    _arrmodify.add(_unicode);
                } else {
                    _arrmodify.edit(_unicode);
                }
            }
            _going = !(_point === 0x200d || _point > _code) || _point === 0x200c;
        }
        return _stringarr;
    };

    if (!system || !Number(system) || !(Number(system) >= 2 && Number(system) <= 36)) {
        return unicodesplit.call(this);
    } else {
        var _decarr = new Array(),
            _codearr = new Array(),
            _retarr = new Array();
        for (var i = 0; i < this.length; i++) {
            var _code = this.charCodeAt(i),
                _point = this.codePointAt(i);
            if (_point > _code) {
                _decarr.push(_point);
                i++;
            } else {
                _decarr.push(_code);
            }
            _codearr.push(_code);
        }

        switch (system.toString().toUpperCase()) {
            case 'UTF-16':
                _retarr = _codearr.map(function(val) {
                    var _pre = prefix === true ? '\\' + 'u' : '';
                    return _pre + val.toString(16);
                });
                break;
            case 'UTF-32':
                _retarr = _decarr.map(function(val) {
                    var _pre = prefix === true ? 'U+' : '';
                    return _pre + val.toString(16);
                });
                break;
            default:
                if (Number(system)) {
                    _retarr = _decarr.map(function(val) {
                        return val.toString(Number(system));
                    });
                }
                break;
        }
        return _retarr;
    }
};
