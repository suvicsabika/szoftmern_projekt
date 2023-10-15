import React from "react";

import { NextUIProvider, Card, CardHeader, CardBody, Divider, Accordion, AccordionItem } from "@nextui-org/react";
import MyNavbar from "../../components/MyNavbar";

import "./About.css";

export default function About() {
    const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    return (
        <NextUIProvider>
            <MyNavbar />
            <Accordion className="">
                <AccordionItem key="1" aria-label="Accordion 1" title="Bevezetés">
                    {defaultContent}
                </AccordionItem>
                <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
                    {defaultContent}
                </AccordionItem>
                <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
                    {defaultContent}
                </AccordionItem>
            </Accordion>
            <Card >
                <CardBody>
                    <h1>Szoftverfejlesztés Mérnököknek Projekt</h1>
                    <CardHeader className="flex gap-3 ">
                        <div className="flex flex-col">
                            <h1>Bevezetés</h1>
                        </div>
                    </CardHeader>
                    <Divider className="mb-2" />
                    <p> A projekt célja egy olyan webalkalmazás megalkotása, amely megkönnyíti az adott cégnél dolgozó kamionsofőrök nyilvántartását.<br />
                        Ebben a webalkalmazásban nyomon tudjuk követni a kamionsofőrök adatait és fuvarjait.<br />
                        A webalkalmazásban a kamionsofőrök tudják kezelni a fuvarjaikat, illetve a fuvarokhoz tartozó adatokat.<br />
                    </p>
                </CardBody>
            </Card>
        </NextUIProvider>
    )
}