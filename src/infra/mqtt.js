const mqtt = require('mqtt');
const logger = require('infra').logger.child({ module: 'mqtt' });
const config = require('config');

class MqttService {
    constructor() {
        this.topic = config.mqttTopic;
        this.client = null;
    }

    open() {
        this.client = mqtt.connect(config.mqtt, {
            clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
            clean: true,
            connectTimeout: 4000,
            reconnectPeriod: 1000,
        });

        this.client.on('connect', () => {
            logger.info('mqtt Connected ,url = ' + config.mqtt);
            this.client.subscribe(this.topic, { qos: 1 }, () => {
                logger.info(`mqtt Subscribe to topic '${this.topic}'`);
            });
        });

        this.client.on('disconnect', () => {
            logger.info('disconnect mqtt ');
        });

        this.client.on('error', err => {
            logger.error('on error: ', err);
        });

        // 获取监听的mqtt信息并处理业务
        this.client.on('message', (topic, buffer) => {
            try {
                let message = buffer.toString();
            } catch (err) {
                console.error(err);
            }
        });
    }

    publish(topic, event) {
        if (!topic || !event) return;
        let payload = JSON.stringify(event);

        if (this.client.connected) {
            this.client.publish(topic, payload, { qos: 1, retain: false });
            logger.info(`mqtt publish success, topic=${topic}, payload=${payload}`);
        } else {
            logger.error(`publish fail beacause backend mqtt disconnected, topic=${topic}, payload=${payload}`);
        }
    }

    close() {
        this.client.end();
        logger.info('disconnect mqtt');
    }
}

module.exports = new MqttService();
