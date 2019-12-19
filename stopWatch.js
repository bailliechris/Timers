class stopWatch {
    constructor(id){
        this.startTime = 0;
        this.running = false;
        this.elapsed = 0;
        this.pauseTime = 0;
        this.id = id; 
        this.delete = false;       
    }

    returnDeleteTag(){
        return this.delete;
    }

    returnID(){
        return this.id;
    }

    returnNextID(){
        return this.id + 1;
    }

    deleteMe(){
        this.delete = true;
    }

    setStartTime(start){
        this.startTime = start;
        this.running = true;
        this.elapsed = 0;
        this.pauseTime = 0;
    }

    pause(time){
        this.running = false;
        this.pauseTime = this.pauseTime + (time-this.startTime);
    }

    resume(start){
        this.running = true;
        this.startTime = start;
    }

    //Capture time at the end
    stop(end){
        this.elapsed = this.pauseTime + (end - this.startTime);
        this.running = false;
    }

    //Latest
    update(timeNow, type){
        if (this.running === true){
            this.elapsed = this.pauseTime + (timeNow - this.startTime);
        }

        if (type === "html"){
            return "<br>" + this.sortTime(this.elapsed);
        }
        else {
            return this.sortTime(this.elapsed);
        }
        
    }

    sortTime(amount){
        let seconds = Math.floor((amount / 1000) % 60),
        minutes = Math.floor((amount / (1000 * 60)) % 60),
        hours = Math.floor((amount / (1000 * 60 * 60)) % 24);
    
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        
        return hours + ":" + minutes + ":" + seconds;
    }
}