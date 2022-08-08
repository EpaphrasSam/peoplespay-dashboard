import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
const SkeletonHeaderCard = ({height}) => {
    return (
        <SkeletonTheme >
            <section>
                    <div sstyle={{ padding: "10px" }}>
                        <Skeleton height={height} />
                    </div>
            </section>
        </SkeletonTheme>
    );
};

export default SkeletonHeaderCard;