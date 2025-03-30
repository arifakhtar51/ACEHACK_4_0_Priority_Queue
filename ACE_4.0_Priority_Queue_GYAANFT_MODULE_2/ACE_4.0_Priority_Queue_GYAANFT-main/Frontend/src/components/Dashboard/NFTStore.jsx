import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import nftIcon from '../assets/ethereum.svg';
import ethereumIcon from '../../assets/ethereum.svg';
import starIcon from '../../../public/6.png'

function NFTStore() {
    const [animate, setAnimate] = useState(false);
    const coins = useSelector(state => state.user.nft);

    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <div className="bg-gray-200 dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 h-fit lg:h-[63%] max-w-2xl mx-auto transform transition-all duration-500"
            style={{
                animation: animate ? 'slideDown 0.5s ease-out forwards' : 'none',
                opacity: 0,
            }}>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2 transform"
                    style={{
                        animation: animate ? 'fadeIn 0.5s ease-out forwards' : 'none',
                        opacity: 0,
                    }}>
                        <img
                        src={starIcon}
                        alt="NFT"
                        className="w-6 h-6"
                        style={{
                            animation: animate ? 'spin 20s linear infinite' : 'none'
                        }}
                    />
                    Your NFTs
                </h2>
            </div>

            {/* NFT Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Total Earned */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md text-center relative overflow-hidden"
                    style={{
                        animation: animate ? 'slideIn 0.5s ease-out 0.4s forwards' : 'none',
                        opacity: 0,
                    }}>
                    <div className="shine-effect" />
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2">
                        Total NFTs Earned
                    </h3>
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-2"
                        style={{
                            animation: animate ? 'countUp 1s ease-out 0.7s forwards' : 'none',
                            opacity: 0,
                        }}>
                        2322
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        (0.00000038 ETH)
                    </p>
                </div>

                {/* Total Spent */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md text-center relative overflow-hidden"
                    style={{
                        animation: animate ? 'slideIn 0.5s ease-out 0.4s forwards' : 'none',
                        opacity: 0,
                    }}>
                    <div className="shine-effect" />
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2">
                        Total NFTs Spent here
                    </h3>
                    <p className="text-xl font-bold text-red-600 dark:text-red-400 mt-2"
                        style={{
                            animation: animate ? 'countUp 1s ease-out 0.7s forwards' : 'none',
                            opacity: 0,
                        }}>
                        981
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        (0.00000016 ETH)
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes pulse {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                    100% {
                        transform: scale(1);
                    }
                }

                @keyframes countUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .shine-effect {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.2),
                        transparent
                    );
                    animation: shine 3s infinite;
                }

                @keyframes shine {
                    0% {
                        left: -100%;
                    }
                    50% {
                        left: 100%;
                    }
                    100% {
                        left: 100%;
                    }
                }
            `}</style>
        </div>
    );
}

export default NFTStore;