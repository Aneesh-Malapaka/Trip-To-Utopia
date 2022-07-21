// function get_nearby_places(id) {
//   const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': '25823ba57dmsh5ae0a22908fe6bfp14b8e4jsn9a46d658e006',
//       'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
//     },
//   };

//   fetch(
//     `https://booking-com.p.rapidapi.com/v1/hotels/nearby-places?hotel_id=${id}&locale=en-gb`,
//     options
//   )
//     .then((response) => response.json())
//     .then((response) => {
//       // var res =
//       console.log(response.landmarks.populars);
//       // return res;
//     })
//     .catch((err) => console.error(err));
// }

// function get_hotels(dest_id, hname) {
//   let destID = dest_id;
//   const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
//       'X-RapidAPI-Key': '25823ba57dmsh5ae0a22908fe6bfp14b8e4jsn9a46d658e006',
//     },
//   };

//   fetch(
//     `https://booking-com.p.rapidapi.com/v1/hotels/search?checkout_date=2022-10-01&units=metric&dest_id=${destID}&dest_type=city&locale=en-us&adults_number=2&order_by=popularity&filter_by_currency=INR&checkin_date=2022-09-30&room_number=1&children_number=2&page_number=0&children_ages=5%2C0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&include_adjacency=true`,
//     options
//   )
//     .then((response) => response.json())
//     .then((response) => {
//       // console.log(response.result);
//       //   let found = response.find((name) => name == "result");
//       for (var i = 0; i < response.result.length; i++) {
//         if (hname === response.result[i].hotel_name) {
//           var id = response.result[i].hotel_id;
//         }
//       }
//       // console.log(id);
//       var places = get_nearby_places(id);
//       return places;
//     })
//     .catch((err) => console.error(err));
// }

// export default function func() {
//   let val = document.getElementById('cname').value;
//   let hotelName = document.getElementById('hname').value;
//   const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
//       'X-RapidAPI-Key': '25823ba57dmsh5ae0a22908fe6bfp14b8e4jsn9a46d658e006',
//     },
//   };

//   fetch(
//     `https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-us&name=${val}`,
//     options
//   )
//     .then((response) => response.json())
//     .then((response) => {
//       // console.log(response);
//       var destid = response[0].dest_id;
//       // console.log(destid);
//       var retPlaces = get_hotels(destid, hotelName);
//       console.log(retPlaces);
//       return retPlaces;
//     })
//     .catch((err) => console.error(err));
// }

export function getAirport(searchParams) {
  const axios = require('axios');

  const options = {
    method: 'GET',
    url: 'https://aerodatabox.p.rapidapi.com/airports/search/term',
    params: { q: searchParams, limit: '10' },
    headers: {
      'X-RapidAPI-Key': '43fadc81d6msh099c62fd7934fe6p1507a4jsn70ceccf6d49b',
      'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com',
    },
  };

  return axios.request(options);
}
