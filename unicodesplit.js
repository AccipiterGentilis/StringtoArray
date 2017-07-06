String.prototype.unicodesplit = function() {
	var _decarr = new Array(),
	    _stringarr = new Array(),
	    _going = true,
	    _strindex = 0;
	for(var i = 0; i < this.length; i++){
		var _code = this.charCodeAt(i),
		    _point = this.codePointAt(i),
		    _unicode = String.fromCharCode(_code);

		if(_code === 0x200D){
			_stringarr[_strindex] += _unicode;
			_going = false;
		}else{
			if(_going){
				_stringarr[++_strindex] = _unicode;
			}else{
				_stringarr[_strindex] += _unicode;
			}

			_going = !(_point > _code);			
		}
	}
	return _stringarr;
};
