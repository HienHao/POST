const puppeteer = require('puppeteer');
const fetch = require('node-fetch');

const {setURL} = require('./getdataid.module');
const {convertCookieFacebook} = require('./cookie');
access_token = 'EAAAAZAw4FxQIBAD1PrMxGfTsIR4ALAXrQWBoBl4NPQRguZA0UBzHmthm6ZBMqqs6yhlKHxtZAdAt5MasLYmRTf356fC2YYCJhLZCgZCKrVb2o9sNj14kh7igsaZBBgcUQiOCLTAdx7nuXZBhgYhTZAMFyjZCizuW4WhOCOdfmhSgFgflbcQVsrlMfGA0U4qkeOsJsZD';
function setIdPost(idPost, accessTokenOfUser) {
  return "https://graph.facebook.com/v4.0/" + idPost + "/feed?limit(1)&&fields=likes.summary(total_count)&access_token=" + accessTokenOfUser;
};
async function getShareLikeCommentImagesFromPage(url, cookie, currentResult = 0, result = []) {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  const cookieConverted = await convertCookieFacebook( cookie );
  await page.setCookie( ...cookieConverted );
  await page.setViewport( { "width": 1250, "height": 850 } );
  await page.waitFor( 1000 );
  try {
    await page.goto(url, {waitUntil: 'load', timeout: 0});
  } catch(error) {
   // do as you wish with this error and then do your next actions
    
    throw new Error(error);
}
  // await page.click('div._3x-2 div._2a2q._65sr a div.uiScaledImageContainer');
  // await page.click('a.snowliftPager.next.hilightPager');
  // await page.click('div>a[data-testid*="UFI2CommentsPagerRenderer/');
  const count = currentResult;
  const data_ = result;
  await getCommentPost(page);
  const imageSrcSets = await page.evaluate( async() => {
    const createTmePost = document.querySelector('span.timestampContent').innerText;
    const contentPost = Array.from(document.querySelectorAll('div.userContent>p')).map(item => item.innerText);
    const likePost = document.querySelector('form.commentable_item span._81hb').innerText;
    const commentPost = document.querySelector('form.commentable_item div._4vn1 a._3hg-._42ft').innerText;
    const sharePost = document.querySelector('form.commentable_item div._4vn1 a._3rwx._42ft').innerText;
    
    
    
    return {
      createTmePost,
      contentPost,
      likePost,
      commentPost,
      sharePost,
      
    }
  });
  return imageSrcSets;
  
};
async function getCommentPost(page, count = 0){
  var a = async () => { page.$$('div[data-testid="UFI2Comment/body"]').then(async data => {
    console.log(count);
    if (data.length == count) {
      await a();
    }
    else {
      count = data.length;
      page.click('div>a[data-testid="UFI2CommentsPagerRenderer/pager_depth_0"]').then(async () => {
        page.waitForSelector('div>a[data-testid="UFI2CommentsPagerRenderer/pager_depth_0"]', {timeout: 5000})
        .then(async () => {
          await getCommentPost(page, count);
          
        })
        .catch(e => {
          console.log(e);
        });
      })
      .catch(e => {
        console.log('_____-')
        console.log(new Date());
        console.log('________');
        return;
      })
    }
  })}
  await a();
  // console.log(new Date());
  // page.click('div>a[data-testid="UFI2CommentsPagerRenderer/pager_depth_0"]').then(async () => {
  //   page.waitForSelector('div>a[data-testid="UFI2CommentsPagerRenderer/pager_depth_0"]', {timeout: 5000})
  //   .then(async () => {
  //     await getCommentPost(page);
      
  //   })
  //   .catch(e => {
  //     console.log(e);
  //   });
  // })
  // .catch(e => {
  //   console.log('_____-')
  //   console.log(new Date());
  //   console.log('________');
  //   return;
  // })
  
  
}
async function main() {
  const url = 'https://facebook.com/687231698452128';
  const idPost = '687231698452128';
  const cookie = 'sb=0wgsXfkaEA0i3FoP-cg2hXbk; datr=0wgsXTcwojtEAmRmSDOZCQHY; locale=vi_VN; c_user=100006889479532; xs=27%3AIyjRtMMbjZa0aA%3A2%3A1567870759%3A19246%3A6315; spin=r.1001148861_b.trunk_t.1567870760_s.1_v.2_; fr=0wgfiGjUbt8gWeusU.AWUBmPDHZVZ6VtQNb6i0Yz-0TRY.BdLAHq.BH.AAA.0.0.BddF_G.AWWl19Je; act=1567908567675%2F6; wd=1749x491; presence=EDvF3EtimeF1567908716EuserFA21B06889479532A2EstateFDt3F_5b_5dEutc3F1567873281567G567908716396CEchFDp_5f1B06889479532F1CC';
  getShareLikeCommentImagesFromPage(url, cookie).then(
    data => {
      console.log(data);
    }
  ).catch(err => {
    console.log(err);
  });
};
main();

