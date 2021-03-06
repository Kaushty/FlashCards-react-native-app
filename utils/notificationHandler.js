import React from 'react'
import { AsyncStorage } from 'react-native'
import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo';


const NOTIFICATION_KEY = 'UDACICARDS:NOTIFICATION'
export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(async () => {
    try {
      Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      // treat error here
      console.log(error);
    }
  });
}
  
  function createNotification () {
    return {
      title: "Pracitice makes a man perfect!",
      body: "👋 don't forget to practice your flashCards today!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  }
  
  // export function setLocalNotification () {
  //   AsyncStorage.getItem(NOTIFICATION_KEY)
  //     .then(JSON.parse)
  //     .then((data) => {
  //       if (data === null) {
  //         Permissions.askAsync(Permissions.NOTIFICATIONS)
  //           .then(({ status }) => {
  //             if (status === 'granted') {
  //               Notifications.cancelAllScheduledNotificationsAsync()
  
  //               let tomorrow = new Date()
  //               tomorrow.setDate(tomorrow.getDate() + 1)
  //               tomorrow.setHours(20)
  //               tomorrow.setMinutes(0)
  
  //               Notifications.scheduleLocalNotificationsAsync(
  //                 createNotification(),
  //                 {
  //                   time: tomorrow,
  //                   repeat: 'day',
  //                 }
  //               )
  
  //               AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
  //             }
  //           })
  //       }
  //     }).catch(console.log('error'))
  // }

  
export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}