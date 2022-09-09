

export let nextKeyframeDirection = 0;
export let switchBlock = false;


export function addInput(){
    window.addEventListener("keydown", (event) => {
        if(event.key === "a"){
            nextKeyframeDirection = 1;
        }else if(event.key ==="d"){
            nextKeyframeDirection = 2;
        }
    })

    window.addEventListener("keyup", (event) => {
        if(event.key === "a"){
            nextKeyframeDirection = 0;
        }else if(event.key ==="d"){
            nextKeyframeDirection = 0;
        }
    })

}