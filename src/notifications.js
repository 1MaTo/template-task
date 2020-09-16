

export const displayNotification = (text) => {
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then((reg) => {
            let options = {
                body: text,
                icon: 'favicon.ico',
                vibrate: [100, 50, 100],
                actions: [
                    {
                        action: 'close', title: 'Закрыть'
                    }
                ]
            }
            reg.showNotification('Template task', options)
        })
    }
}