import { Figure } from 'react-bootstrap'
import logo from '../Brick-Tactical-Logo.png'

export function MainPageLogoFigure(props) {
    return(

        <Figure id={props.imageid}>
            <Figure.Image
                width={171}
                height={180}
                alt="171x180"
                src={logo}
                style={{ paddingTop: '20px' }}
            />
            <Figure.Caption>
                Vendor Wholesale Page
            </Figure.Caption>
        </Figure>
    )
}

export function InvoiceLogoFigure(props) {
    return(

        <Figure id={props.figureId}>
            <Figure.Image
                src={logo}
                id={props.imageId}
            />
            <Figure.Caption id={props.captionId}>
                Vendor Wholesale Page
            </Figure.Caption>
        </Figure>
    )
}