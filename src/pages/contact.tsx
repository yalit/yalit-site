import React from "react";
import Layout from "../components/layout";
import FontAwesome from "../components/fontAwesome/fontAwesome";

export default function Contact() {
    return (
        <Layout>
            <div className="flex flex-col gap-10 items-center justify-center h-[50vh]">
                <div className="flex justify-center items-center gap-3">
                    <FontAwesome icon="arobase" className="h-5 w-7 fill-gray-800 mt-3" />
                    <h1 className="text-4xl font-semibold text-gray-800">contact[@]yalit.be</h1>
                </div>
            </div>
        </Layout>
    );
}
