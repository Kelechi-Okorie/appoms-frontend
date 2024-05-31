// import axios from 'axios';
const axios = require('axios')

const func = async () => {
    const response = await axios.get(`http://localhost:4000/api/v1/users/`);

    const data = response.data

    console.log(data)
};

func()

