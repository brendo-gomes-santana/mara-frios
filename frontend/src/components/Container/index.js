

import Header from "../header"

import { Base } from "./styled"

export default function Container({children}){
    return(
        <>
            <Header/>
            <Base>
                {children}
            </Base>
        </>
    )
}