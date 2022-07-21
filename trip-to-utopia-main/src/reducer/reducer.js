import { createStore } from "redux";
import initialState from "../state/state";


const reset_form = {
    selected_processor: '',
    selected_cpu_cooler: '',
    selected_motherboard: '',
    selected_ram: '',
    selected_gpu: '',
    selected_psu: '',
    selected_case_cooler: '',
    selected_monitor: '',
    total_price: 0,
    token: '',
    email: ''
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "add_processor":
            {
                state.selected_processor = action.payload;
                state.total_price =
                state.total_price + action.payload.price.current_price;
                return state;
            }
        case "remove_processor":
            {
                return {
                    ...state,
                    total_price: state.total_price - action.payload.price.current_price,
                    selected_processor: "",
                };
            }

        case "add_cpu_cooler":
            {
                state.selected_cpu_cooler = action.payload;
                state.total_price =
                state.total_price + action.payload.price.current_price;

                return state;
            }
        case "remove_cpu_cooler":
            {
                return {
                    ...state,
                    total_price: state.total_price - action.payload.price.current_price,
                    selected_cpu_cooler: "",
                };
            }

        case "add_ram":
            {
                state.selected_ram = action.payload;
                state.total_price =
                state.total_price + action.payload.price.current_price;

                return state;
            }
        case "remove_ram":
            {
                return {
                    ...state,
                    total_price: state.total_price - action.payload.price.current_price,
                    selected_ram: "",
                };
            }
        case "add_gpu":
            {
                state.selected_gpu = action.payload;
                state.total_price =
                state.total_price + action.payload.price.current_price;

                return state;
            }
        case "remove_gpu":
            {
                return {
                    ...state,
                    total_price: state.total_price - action.payload.price.current_price,
                    selected_gpu: "",
                };
            }
        case "add_motherboard":
            {
                state.selected_motherboard = action.payload;
                state.total_price =
                state.total_price + action.payload.price.current_price;

                return state;
            }
        case "remove_motherboard":
            {
                return {
                    ...state,
                    total_price: state.total_price - action.payload.price.current_price,
                    selected_motherboard: "",
                };
            }
        case "add_psu":
            {
                state.selected_psu = action.payload;
                state.total_price =
                state.total_price + action.payload.price.current_price;

                return state;
            }
        case "remove_psu":
            {
                return {
                    ...state,
                    total_price: state.total_price - action.payload.price.current_price,
                    selected_psu: "",
                };
            }
        case "add_case_cooler":
            {
                state.selected_case_cooler = action.payload;
                state.total_price =
                state.total_price + action.payload.price.current_price;

                return state;
            }
        case "remove_case_cooler":
            {
                return {
                    ...state,
                    total_price: state.total_price - action.payload.price.current_price,
                    selected_case_cooler: "",
                };
            }
        case "add_monitors":
            {
                state.selected_monitor = action.payload;
                state.total_price =
                state.total_price + action.payload.price.current_price;

                return state;
            }

        case "remove_monitors":
            {
                return {
                    ...state,
                    total_price: state.total_price - action.payload.price.current_price,
                    selected_monitor: "",
                };
            }
        case 'add_token':
            {

                console.log('ADD_TOKEN IS CALLEDE')
                return {
                    ...state,
                    token: action.payload
                }
            }
        case 'remove_token':
            {
                return {
                    ...state,
                    token: ''
                }
            }
        case 'add_email':
            {
                console.log("ADDING IS EMAIL", action.payload)
                return {
                    ...state,
                    email: action.payload
                }
            }
        case "reset_data":
            {
                state = {
                    ...reset_form
                }
                return state
            }

        default:
            break;
    }

    return state;
};

const store = createStore(reducer);



export default store;