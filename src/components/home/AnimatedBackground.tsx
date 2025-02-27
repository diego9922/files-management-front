import { useEffect, useReducer, useRef } from "react";
import { Box, duration } from "@mui/material";
import { purple } from '@mui/material/colors';
import { useAnimate, press, hover, useMotionValue, frame, useSpring, motion } from "motion/react";
import 'assets/home/css/home.css';
import randomNumber from "utils/randomNumber";
import { delay } from "motion";

const Square = () => {
    const size = randomNumber({ min: 0, max: 10 });
    const rotate = useMotionValue(0);
    const [scope, animate] = useAnimate();
    useEffect(()=>{
        const elementeAnimate = animate(
            scope.current,
            { 
                opacity: randomNumber({ min: 0.2, max: 1 }),
                y: "-100vh",
                rotateZ: randomNumber({ min: -50, max: 50 })
            },
            { 
                duration: randomNumber({ min: 8, max: 20 }),
                repeat: Infinity 
            }
        );
        hover(scope.current, function(element){
            // elementeAnimate.stop();
            animate(element, { left: `${randomNumber({ min: 0, max: 190 })}vh`, rotateZ: 360 }, {duration: 5})
        });
        press(scope.current, function(element){
            animate(element, { rotateX: 180 }, {duration: 5})
        });
    },[]);
    return <Box
        ref={scope}
        sx={{
            bgcolor: 'primary.main',
            height: `${size}vh`,
            width: `${size}vh`,
            borderRadius: "6px",
            left: `${randomNumber({ min: 0, max: 190 })}vh`,
            bottom: 0,
            position: "absolute",
            opacity: 0
        }}
    />
};

const CursorEffect = () => {
    // const spring = { 
        // damping: 20, 
        // stiffness: 200, 
        // restDelta: 0.001
        // velocity: 100
    // };
    const numberOfBalls = 5;
    const xPoint1 = useMotionValue(0);
    const yPoint1 = useMotionValue(0);
    // const x = useSpring(xPoint, spring);
    // const y = useSpring(yPoint, spring);
    // const [scope, animate] = useAnimate();
    
    
    
    
    const Ball = ({ballNumber}:{ballNumber:number})=>{
        const ref = useRef<HTMLDivElement>(null);
        const xPoint = useMotionValue(0);
        const yPoint = useMotionValue(0);
        useEffect(()=>{
            if (!ref.current) return;
            const handlePointerMove = ({clientX, clientY}: MouseEvent)=>{
                const element = ref.current!
                frame.read(()=>{
                    const x = clientX-element.offsetLeft-element.offsetWidth/2
                    const y = clientY-element.offsetTop-element.offsetHeight/2;
                    setTimeout(
                        ()=>{
                            xPoint.set(x);
                            yPoint.set(y);
                        },
                        (ballNumber-1)*35
                    );
                });
            };
            window.addEventListener("pointermove", handlePointerMove);
        },[]);
        return <motion.div
            ref={ref}
            style={{
                backgroundColor: purple[500],
                borderRadius: '50%',
                position: 'fixed',
                width: `${50-(ballNumber*2)}px`,
                height: `${50-(ballNumber*2)}px`,
                x: xPoint,
                y: yPoint,
                opacity: 0.6-(0.1*ballNumber),
            }}
        />;
    };

    const Balls = ()=>{
        let balls = [];
        for(let i = 0; i <= numberOfBalls; i++) {
            balls.push(<Ball ballNumber={i}/>);
        }
        return <>{balls}</>;
    };

    return <>
        <Balls/>
    </>
    ;
};

// type ScarePosition = {
//     x: number;
//     y: number;
// }
const AnimatedBackground = ()=> {

    // const [addedScares, dispatch] = useReducer((currentVal: ScarePosition[], addVal: ScarePosition)=>{
    //     const newVal = currentVal;
    //     newVal.push(addVal);
    //     console.log(newVal);
    //     return Array.from(newVal);
    // }, [{x:977, y:833}]);

    const Scares = ()=>{
        let scares = [];
        for(let i = 0; i <= randomNumber({ min: 15, max: 30 }); i++) {
            scares.push(<Square/>);
        }
        return <>{scares}</>;
    };
    const clickFunction = ({clientX, clientY, target}:React.MouseEvent<HTMLElement>) => {
        // dispatch({ x: clientX, y: clientY });
    };

    return <Box 
        sx={{
            // bgColor: purple[900],//'primary.dark',
            // color: 'text.secondary',
            height: "100vh",
            // position: "absolute",
            overflow: "hidden"
        }}
        className="bg-dark"
        onClick={clickFunction}
    >
        <Scares/>
        <CursorEffect/>
        {/* {addedScares.map((i,k)=><Square key={k}/>)} */}
    </Box>
}

export default AnimatedBackground;