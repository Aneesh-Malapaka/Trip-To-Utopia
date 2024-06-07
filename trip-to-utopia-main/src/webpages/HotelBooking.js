import React from "react";
import Header from "../components/Header";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function HotelBooking(props) {
  const [image, setImage] = useState([]);
  let img_list = image;

  const [hotelData, setHotelData] = useState({});
  const [review, setReview] = useState({});
  const [desc, setDesc] = useState({});

  const hist = useHistory();
  const selector = useSelector((state) => state);
  const bookHotel = (item) => {
    if (selector.email === "") {
      return hist.push("/loginPage");
    }

    axios
      .post("http://localhost:3002/order_hotel ", {
        ...item,
        email: selector.email,
      })
      .then((res) => {
        alert("Hotel Room Reserved Successfully!!");
      })
      .catch((e) => {
        alert("ERROR WHILE PLACING ORDER");
        console.log("ERROR WHILE PLACING ORDER");
        console.log(e);
      });
  };
  useEffect(() => {
    function get_hotel_data(id) {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "9b03cfc029msh2ebb52c2f5c005cp1299f3jsn8fe51ec8b8de",
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        },
      };
      try {
        fetch(
          `https://booking-com.p.rapidapi.com/v1/hotels/data?hotel_id=${id}&locale=en-gb`,
          options
        )
          .then((res) => res.json())
          .then((res) => {
            setHotelData(res);
          });
      } catch (err) {
        console.log(err);
      }
    }
    async function get_hotel_review(id) {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "9b03cfc029msh2ebb52c2f5c005cp1299f3jsn8fe51ec8b8de",
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        },
      };

      try {
        const res_review = await fetch(
          `https://booking-com.p.rapidapi.com/v1/hotels/reviews?sort_type=SORT_MOST_RELEVANT&locale=en-gb&hotel_id=${id}&language_filter=en-gb%2Cde%2Cfr&customer_type=solo_traveller%2Creview_category_group_of_friends`,
          options
        );
        const review_json = await res_review.json();

        setReview(review_json);
      } catch (err) {
        console.log(err);
      }
    }

    function get_hotel_description(id) {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "9b03cfc029msh2ebb52c2f5c005cp1299f3jsn8fe51ec8b8de",
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        },
      };

      fetch(
        `https://booking-com.p.rapidapi.com/v1/hotels/description?hotel_id=${id}&locale=en-gb`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setDesc(response.description);
          // console.log(response.description)
        })
        .catch((err) => console.error(err));
    }

    var id = params.hotelId;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "9b03cfc029msh2ebb52c2f5c005cp1299f3jsn8fe51ec8b8de",
        "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
      },
    };

    fetch(
      `https://booking-com.p.rapidapi.com/v1/hotels/photos?locale=en-gb&hotel_id=${id}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setImage(response);
      })
      .catch((err) => console.error(err));
    get_hotel_data(id);
    get_hotel_review(id);
    get_hotel_description(id);
  }, []);

  const params = useParams();

  // var key = props.code;
  return (
    <div className="bookPageBody">
      <Header />
      <div className="bookingPageCont">
        <div className="section1">
          <div className="basicHotelInfo">
            <div className="upper">
              <p>Hotel</p>
              <h3>{hotelData.name}</h3>
              <p className="rating">
                <FontAwesomeIcon className="rating--ico" icon={faStar} />
                &nbsp;{hotelData.review_score}
              </p>
            </div>
            <div className="lower">
              <p>
                <i className="fas fa-map-marker-alt"></i>
                {hotelData.address} -{" "}
              </p>
              <p className="review_word">{hotelData.review_score_word} - </p>
              <p className="review--count">{hotelData.review_nr} reviews</p>
            </div>
          </div>
          <div className="imgContainer">
            {img_list.slice(0, 10).map((item, index) => {
              return <img key={index} src={item.url_1440} alt="" />;
            })}
          </div>
        </div>
        <div className="info--container">
          <div className="left--part">
            <p className="description">
              {Object.keys(hotelData).length &&
              hotelData.hasOwnProperty("description_translations")
                ? desc
                : "NO Description Provided"}
            </p>
          </div>
          <div className="right--part">
            <button
              onClick={() => {
                bookHotel(hotelData);
              }}
            >
              Reserve a room now
            </button>
          </div>
        </div>
        <div className="review--container">
          <h3 className="title">Reviews</h3>
          {review.result
            ? review.result.slice(0, 6).map((item, index) => {
                return (
                  <div className="review--box" id={index}>
                    <div className="line1">
                      <div className="pers--info">
                        <p className="pers--name">{item.author.name}- </p>
                        <p className="pers--type">{item.author.type_string}</p>
                        <p className="pers--purpose">
                          - {item.travel_purpose} &nbsp;{" "}
                        </p>
                        <p className="pers--rating">
                          - {item.average_score.toFixed(1)}{" "}
                          <FontAwesomeIcon
                            className="rating--ico"
                            icon={faStar}
                          />
                          &nbsp;{" "}
                        </p>
                      </div>
                      <div className="rev--date">
                        <p>{item.date}</p>
                      </div>
                    </div>
                    <div className="line2">
                      <div className="rev--title revv">
                        <p className="rev--head">
                          Title:&nbsp;<span>{item.title}</span>
                        </p>
                      </div>
                      <div className="rev--pros revv">
                        <p className="rev--head">
                          Pros:&nbsp;
                          {item.pros !== "" ? (
                            <span>{item.pros}</span>
                          ) : (
                            <span
                              style={{
                                color: "red",
                              }}
                            >
                              Not mentioned
                            </span>
                          )}{" "}
                        </p>
                      </div>
                      <div className="rev--cons revv">
                        <p className="rev--head">
                          Cons: &nbsp;
                          {item.cons !== "" ? (
                            <span>{item.cons}</span>
                          ) : (
                            <span
                              style={{
                                color: "red",
                              }}
                            >
                              Not mentioned
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="rev--roomInfo revv">
                        <p className="rev--head">
                          Room Stayed:&nbsp;
                          <span>{item.stayed_room_info.room_name}</span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            : " "}
        </div>
      </div>
    </div>
  );
}
