const encodeAddress = (address) => {
	return address.replace('', '+');
};

module.exports = {
	encodeAddress,
};
