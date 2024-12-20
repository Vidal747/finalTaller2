'use client';

import { useEffect, useRef } from 'react';
// Sources
import { MotionTransitionProps } from './types';
import { useAnimation, useInView, motion } from 'framer-motion';
import { fadeIn } from '@/utils/transitions';

export function MotionTransition({ children, className }: MotionTransitionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });
    const mainControls = useAnimation();
    const slideControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start('visible');
            slideControls.start('visible');
        } else {            
            mainControls.start('hidden');
            slideControls.start('hidden');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInView]);

    return (
        <div ref={ref}>
            <motion.div
                variants={fadeIn()}
                initial='hidden'
                animate={mainControls}
                exit='hidden'
                className={className}
            >
                {children}
            </motion.div>
        </div>
    );
};
