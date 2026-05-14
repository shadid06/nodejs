import EventEmitter from 'node:events';
class School extends EventEmitter {
    startSchool() {
        console.log('school start at 10am');
        //raise event when bell rings
        setTimeout(() => {
            this.emit('bellRinged', {
                time: 'its 4pm',
                text: 'go home',
            });
        }, 3000);
    }
}
export default School;
