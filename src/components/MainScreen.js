import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const API_KEY = 'c135b9192622d6b0ec828506a1f2f0b1';

const MainScreen = ({ city }) => {
    const [dayTimeGradient, setDayTimeGradient] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    const fetchTimeData = async () => {
        try {
            const response = await fetch(`http://worldtimeapi.org/api/timezone/Europe/${city}`);
            const data = await response.json();
            const currentTime = new Date(data.datetime);
            const currentHour = currentTime.getHours();

            let dayTimeGradient;
            if (currentHour >= 6 && currentHour < 12) {
                dayTimeGradient = ['#35467a', '#b48571']; // morning gradient
            } else if (currentHour >= 12 && currentHour < 18) {
                dayTimeGradient = ['#0d4c92', '#5b9ad9']; // afternoon gradient
            } else if (currentHour >= 18 && currentHour < 20) {
                dayTimeGradient = ['#0c1a57', '#e58bba']; // evening gradient
            } else {
                dayTimeGradient = ['#00062f', '#313691']; // night gradient
            }
            setDayTimeGradient(dayTimeGradient);
        } catch (error) {
            console.error('Error fetching time data:', error);
        }
    };

    useEffect(() => {
        if (city) {
            fetchTimeData();
            fetchWeatherData();
        }
    }, [city]);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=us`
            );
            const data = await response.json();
            setWeatherData({
                temp: Math.floor(data.main.temp),
                cond: data.weather[0].main
            });
        } catch (error) {
            console.error('Error fetching weather data: ', error);
        }
    };

    return (
        <View style={styles.container}>
            {dayTimeGradient && (
            <LinearGradient
                colors={dayTimeGradient}
                style={StyleSheet.absoluteFill}>
                <Text style={styles.text1}>{city}</Text>
                {weatherData && (
                <View style={styles.weatherContainer}>
                    <Text style={styles.text2}>
                    {weatherData.temp ? `${weatherData.temp}°` : '--'}
                    </Text>
                    <Text style={styles.text3}>{weatherData.cond}</Text>
                </View>
                )}
            </LinearGradient>
            )}
        </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text1: {
        marginTop: 78,
        color: '#FFF',
        textAlign: 'center',
        fontFamily: '',
        fontSize: 37,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    text2: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: '',
        fontSize: 102,
        fontStyle: 'normal',
        fontWeight: '200',
      },
    text3: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: '',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    text4: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: '',
        fontSize: 21,
        fontStyle: 'normal',
        fontWeight: '500',
    },
    weatherContainer: {
      alignItems: 'center',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
});
  
export default MainScreen;
