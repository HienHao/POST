const getDataId = require('./getdataid.module');
const {IDPAGE} = require('./config');
access_token = 'EAAAAZAw4FxQIBAKOZAE4tXlUFLrGoz2N5VX0AhHIDuTWAEyLdZA6u06bsyPi88ZAPmIrM92X30SEaFgA1C7YjKZCZCzvH749Unsk9zlTEMZCabG0No5GnYC3ZAsRmVFUQTiwIRM17ZBj7PVIqiUMBhxUDatXteypImFd26DqfwIdMZBRZBWgYeoDkT3S9O5YLkpuX4ZD';
module.exports.getId = (req, res, next) => {
  const data = req.params;
  const like = data.like;
  const post = data.post;
  if ( !data ) {
    res.status(500).send('Loi 500');
    return;
  }

  var url = getDataId.setURL(IDPAGE.HOLA_HANOI, access_token);
  getDataId.getabc(url, post, like).then( data => {
    console.log(data);
    res.json(
      {data}
    );
  } );
  // res.json(
  //   {data: req.params.aaa}
  // )

}
