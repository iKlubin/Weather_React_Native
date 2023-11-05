import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Dimensions, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import MainScreen from './src/components/MainScreen';
import * as Location from 'expo-location';
import Swiper from 'react-native-swiper';
import { BlurView } from 'expo-blur';

const { height, width } = Dimensions.get('window');

const a = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"","Ф":"F","Ы":"I","В":"V","А":"a","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"","б":"b","ю":"yu"};

function transliterate(word){
  return word.split('').map(function (char) { 
    return a.hasOwnProperty(char) ? a[char] : char; 
  }).join("");
}

export default function App() {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState(['Tokyo', 'London', 'Moscow']);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let cityLoc = await Location.reverseGeocodeAsync(location.coords);

      try {
        const userCity = transliterate(cityLoc[0].city);
        setCity(userCity);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [city]);

  return (
    <View style={styles.container}>
      <View style={styles.bottomBar}>
        <View style={styles.line} />
        <BlurView intensity={10}
          style={{ flex: 1, backgroundColor: 'rgba(61, 53, 105, 0.9)' }}/>
      </View>
      <Swiper style={styles.wrapper}>
        {[city, ...cities].map((item, index) => (
          <MainScreen key={index} city={item} />
        ))}
      </Swiper>
      <StatusBar style={'light'} translucent backgroundColor={'transparent'}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 78,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: '100%',
    height: 10,
    backgroundColor: 'white',
    marginTop: -1,
  },
  blurView: {
    flex: 1
  },
  wrapper: {},
  imageButton: {
    padding: 10,
  },
  buttonImage: {
    width: 50,
    height: 50,
  },
});


// import React, { useState, useEffect } from "react";
// import { StyleSheet, Text, View, ImageBackground, StatusBar } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";

// const API_KEY = 'c135b9192622d6b0ec828506a1f2f0b1';

// export default function App({ navigation, route }) {
//   const [weather, setWeather] = useState(null);

//   const fetchWeatherData = async (city) => {
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       setWeather(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchWeatherData("Kaliningrad");
//   }, []);

//   const renderCurrentWeather = () => {
//     if (weather) {
//       const { main, weather: weatherArray } = weather;
//       const { temp } = main;
//       const { description, icon } = weatherArray[0];
//       return (
//         <View style={styles.currentWeather}>
//           <Text style={styles.temperature}>{temp}°</Text>
//           <Text style={styles.description}>{description}</Text>
//           <Ionicons name={`ios-${icon}`} size={100} color="#fff" />
//         </View>
//       );
//     } else {
//       return null;
//     }
//   };

//   const renderHourlyForecast = () => {
//     const forecast = [
//       { time: "18:00", temp: 25, icon: "sunny" },
//       { time: "21:00", temp: 22, icon: "moon" },
//       { time: "00:00", temp: 20, icon: "moon" },
//       { time: "03:00", temp: 19, icon: "cloudy-night" },
//       { time: "06:00", temp: 18, icon: "cloudy-night" },
//       { time: "09:00", temp: 20, icon: "cloudy" },
//       { time: "12:00", temp: 23, icon: "partly-sunny" },
//       { time: "15:00", temp: 26, icon: "sunny" },
//     ];

//     return (
//       <View style={styles.hourlyForecast}>
//         {forecast.map((item, index) => (
//           <View key={index} style={styles.hourlyItem}>
//             <Text style={styles.hourlyTime}>{item.time}</Text>
//             <Ionicons
//               name={`ios-${item.icon}`}
//               size={25}
//               color={index === 0 ? "#fff" : "#eee"}
//             />
//             <Text style={styles.hourlyTemp}>{item.temp}°</Text>
//           </View>
//         ))}
//       </View>
//     );
//   };

//   const renderDailyForecast = () => {
//     const forecast = [
//       { day: "Пн", high: 28, low: 18, icon: "sunny" },
//       { day: "Вт", high: 27, low: 17, icon: "partly-sunny" },
//       { day: "Ср", high: 26, low: 16, icon: "cloudy" },
//       { day: "Чт", high: 25, low: 15, icon: "rainy" },
//       { day: "Пт", high: 24, low: 14, icon: "thunderstorm" },
//       { day: "Сб", high: 23, low: 13, icon: "rainy" },
//       { day: "Вс", high: 22, low: 12, icon: "cloudy" },
//       { day: "Пн", high: 21, low: 11, icon: "partly-sunny" },
//       { day: "Вт", high: 20, low: 10, icon: "sunny" },
//       { day: "Ср", high: 19, low: 9, icon: "sunny" },
//     ];

//     return (
//       <View style={styles.dailyForecast}>
//         {forecast.map((item, index) => (
//           <View key={index} style={styles.dailyItem}>
//             <Text style={styles.dailyDay}>{item.day}</Text>
//             <Ionicons name={`ios-${item.icon}`} size={25} color="#fff" />
//             <Text style={styles.dailyTemp}>
//               {item.high}°/{item.low}°
//             </Text>
//           </View>
//         ))}
//       </View>
//     );
//   };

//   const renderBottomBar = () => {
//     // Заглушка для данных об иконках
//     const icons = [
//       { name: "today", label: "Сегодня" },
//       { name: "time", label: "Почасовой" },
//       { name: "calendar", label: "10-дневный" },
//       { name: "compass", label: "Радар" },
//     ];

//     // Отображаем иконки в виде горизонтального списка
//     return (
//       <View style={styles.bottomBar}>
//         {icons.map((item, index) => (
//           <View key={index} style={styles.bottomBarItem}>
//             <Ionicons name={`ios-${item.name}`} size={25} color="#fff" />
//             <Text style={styles.bottomBarLabel}>{item.label}</Text>
//           </View>
//         ))}
//       </View>
//     );
//   };

//   // Возвращаем JSX-разметку приложения
//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" />
//       <ImageBackground
//         source={require("./assets/splash.png")}
//         style={styles.background}
//       >
//         <LinearGradient
//           colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0.6)"]}
//           style={styles.overlay}
//         >
//           {renderCurrentWeather()}
//           {renderHourlyForecast()}
//           {renderDailyForecast()}
//           {renderBottomBar()}
//         </LinearGradient>
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   background: {
//     flex: 1,
//     resizeMode: "cover",
//   },
//   overlay: {
//     flex: 1,
//     padding: 20,
//   },
//   currentWeather: {
//     flex: 3,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   temperature: {
//     fontSize: 80,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   description: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   hourlyForecast: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   hourlyItem: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   hourlyTime: {
//     fontSize: 16,
//     color: "#fff",
//   },
//   hourlyTemp: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   dailyForecast: {
//     flex: 3,
//   },
//   dailyItem: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderBottomWidth: 1,
//     borderBottomColor: "#fff",
//   },
//   dailyDay: {
//     fontSize: 18,
//     color: "#fff",
//   },
//   dailyTemp: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   bottomBar: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-around",
//     backdropFilter: "blur(10px)",
//   },
//   bottomBarItem: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   bottomBarLabel: {
//     fontSize: 14,
//     color: "#fff",
//   },
//   activeTab: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   inactiveTab: {
//     color: "#eee",
//   },
// });
