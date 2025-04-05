import { Separator } from '@/components/ui/separator'
import { TitleWithUnderline } from '@/components/ui/title-with-underline'
import React from 'react'

const Terms = () => {
    return (
        <div>
            <div className="bg-[#F8F8F8] ">

                <div className="px-10 md:px-36 lg:px-48 my-10 pt-8 pb-8">
                    <div className="flex-shrink min-w-0">
                        <TitleWithUnderline text="Terms and Condition" underlineWidth={64} />
                    </div>
                    <p className="text-gray-600 mt-2">Published and Effective on 1st April 2025</p>
                </div>
            </div>

            <div className="px-10 md:px-36 lg:px-48 my-10">
                <div className="bg-slate-50">
                </div>
                <div className="mt-8 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800">Terms</h2>
                    <p className="text-gray-700 mt-2 text-justify">
                        Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis. Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur.
                    </p>
                </div>

                <Separator className="!w-full !mb-2" />


                <div className="mt-8 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800">Conditions</h2>
                    <p className="text-gray-700 mt-2 text-justify">
                        Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis. Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur.
                    </p>
                    <p className="text-gray-700 mt-2 text-justify">
                        Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis. Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur.
                    </p>
                    <p className="text-gray-700 mt-2 text-justify">
                        Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis. Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur.
                    </p>
                </div>
                <Separator className="!w-full !mb-2" />

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-800">Terms of Usage</h2>
                    <p className="text-gray-700 mt-2 text-justify">
                        Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis. Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Terms
