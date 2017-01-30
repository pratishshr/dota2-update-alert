/**
 * @author Pratish Shrestha <pratishshrestha@lftechnology.com>
 */

export default function(item) {
  return (`
    <div style="margin-left: 10px;">
      <img style="width: 250px;"
           src="http://vignette3.wikia.nocookie.net/theamazingworldofgumball/images/d/dd/Logo_Dota_2.png/revision/latest?cb=20130329094246">
      <h1 style=""><a href=${item.link[0]} style="text-decoration: none;">${item.title}</a></h1>
      <p style="font-size: 15px;line-height: 30px;">
        ${item['content:encoded']}   
      </p>
      <div>
        <span style="font-size: 15px;color: rgb(188, 38, 36);"> Update your DOTA 2 client ASAP! </span>
      </div>
    </div>
  `);
}