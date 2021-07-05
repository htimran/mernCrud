import { message } from 'antd';
import axios from 'axios';

export const getPlatforms = (setPlatformData) => {
  axios.get("/platforms")
    .then(res => {
      if (res.status === 200) {
        setPlatformData(res.data.data);
      } else {
        return setPlatformData([]);
      }
    });
};

export const updatePlatform = (platformData) => {
  axios.post("/updatePlatformField", { data: platformData })
    .then(res => {
      if (res.status === 200) {
        message.success('Platform Field Updated successfully');
      } else {
        message.error('Platform Field Not Updated!');
      }
    });
};