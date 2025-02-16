import { useEffect, useReducer } from "react";
import { Box, duration } from "@mui/material";
import { blueGrey } from '@mui/material/colors';
import { useAnimate, press, hover, useMotionValue } from "motion/react";
import 'assets/home/css/home.css';
import randomNumber from "utils/randomNumber";

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
            // bgColor: blueGrey[900],//'primary.dark',
            // color: 'text.secondary',
            height: "100vh",
            // position: "absolute",
            overflow: "hidden"
        }}
        className="bg-dark"
        onClick={clickFunction}
    >
        <Scares/>
        {/* {addedScares.map((i,k)=><Square key={k}/>)} */}
    </Box>
}

export default AnimatedBackground;