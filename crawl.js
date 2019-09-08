const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.listen(8888);

var cookie = 'sb=0wgsXfkaEA0i3FoP-cg2hXbk; datr=0wgsXTcwojtEAmRmSDOZCQHY; locale=vi_VN; c_user=100006889479532; xs=35%3A--XbnrcOeD1FgQ%3A2%3A1567755746%3A19246%3A6315; spin=r.1001143781_b.trunk_t.1567755748_s.1_v.2_; presence=EDvF3EtimeF1567758319EuserFA21B06889479532A2EstateFDt3F_5b_5dEutc3F1567757804611G567758319578CEchFDp_5f1B06889479532F1CC; fr=0wgfiGjUbt8gWeusU.AWVBMwclP5uFpyrXqiRNseKrZ2c.BdLAHq.BH.F1y.0.0.Bdchv1.AWW8alXs; act=1567759692274%2F30; wd=1749x626';
var url = 'https://www.facebook.com/2479532065497324';
var id = '100004135891875';
var agent = 'Google Chrome';
const a = require('./getdataid.controller');
app.get('/getidpost/:post/:like', a.getId);

function getPost( { cookie, agent, url} ) {
    const option = {
      "method": "GET",
      "url": url,
      "headers": {
        "User-Agent": agent,
        "Cookie": cookie
      }
    };
    app.get('/', (req, res) => {
      
      request( option, ( err, response, body ) => {
        
        if (err) {
          console.log(err);
          res.render('crawlHtml', {html: "Loi"});
        } else {
          console.log(body);
          let $ = cheerio.load(body);
          var ds = $(body).find('#u_0_q > div._5pcr.userContentWrapper > div._1dwg._1w_m._q7o > div:nth-child(2) > div._3x-2 > div > div > div > div > a > div > img.scaledImageFitWidth.img');
          ds.each( (i, e) =>{
            // console.log($( this ).text());
            console.log(e['attribs']['src']);
          } );
          
          res.render('crawlHtml', {html: body});
          // return data;
        }
      } );
    });
};

getPost( {cookie, agent, url} );
