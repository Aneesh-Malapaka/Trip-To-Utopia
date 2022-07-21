import React from 'react';

export default function PopularPlaces(props) {
  var dist = (props.item.distance * 2) / 1000;

  let images_arr = [
    ' https://media.cntraveler.com/photos/5cb63a2b1a7e7018aef70957/master/w_4000,h_2667,c_limit/Na-Pali-Coast_GettyImages-1124504102.jpg',

    'https://1.bp.blogspot.com/-fjEImaMScnk/XEF4SQoacnI/AAAAAAAHiys/EhpShEeOESEeCnlsvbrHAFx-k0bOL9MWgCLcBGAs/s1600/bluetravelexpress_1547792911.jpg',

    'https://myfreedo.in/img/2019/10/6697394_Venice.jpg',

    'https://imageio.forbes.com/specials-images/dam/imageserve/1171238184/960x0.jpg?format=jpg&width=960',
  ];
  //   console.log(images_arr.length);
  let val = Math.floor(Math.random() * images_arr.length);
  return (
    <div className="cards">
      <img
        className="card--image"
        src={images_arr[val]}
        alt={props.item.landmark_name}
      />
      <div className="card--info">
        <h2 className="card--location">
          <i className="fas fa-map-marker-alt"></i>
          {props.item.landmark_name}
        </h2>
        <span className="maps">
          <p>{dist} km</p>
        </span>
      </div>
    </div>
  );
}
