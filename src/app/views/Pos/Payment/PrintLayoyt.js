export const OTLayout = (Data) => {
    let layout = []
    if (Data.header) {
        const Header = {
            type: 'text',
            value: Data.header,
            style: `text-align:center;`,
            css: { "font-weight": "bold", "font-size": "18px" }
        }
        layout.push(Header)
    }
    if (Data.subHeader) {
        const SubHeader = {
            type: 'text',
            value: Data.subHeader,
            style: `text-align:center;`,
            css: { "font-weight": "bold", "font-size": "14px" }
        }
        layout.push(SubHeader)
    }
    if (Data.DateTime) {
        const Datetime = {
            type: 'text',
            value: Data.DateTime,
            style: `text-align:center;`,
            css: {  "font-size": "10px", "margin": "2px" }
        }
        layout.push(Datetime)
    }
    //generator.generate(10)
    if (Data.barCode) {
        const BarCode = {
            type: 'barCode',
            value: Data.barCode,
            style: `text-align:center; justify-items: center; justify-content: center; align-items: center;`,
            position: 'center',
            height: 12,
            width: 1,
            displayValue: true,
            fontsize: 8,
        }
        layout.push(BarCode)
    }
    if (Data.tableHeader && Data.tableBody) {
        const body = []
        Data.tableBody.forEach(element => {
            body.push([element.Item, element.Qnt])
        });
        const Table = {
            type: 'table',
            style: 'border: 1px solid #00000000',
            tableHeader: Data.tableHeader,
            tableBody: body,

            tableHeaderStyle: 'background-color: #00000000; color: black;',

            tableBodyStyle: 'border: 0.5px solid #00000000; color: black;',
            css: {
                "width": "100%",
                "border-collapse": "collapse",
            }
        }

        layout.push(Table)
    }

    return layout
}



export const BillLayout = (Data) => {
    let layout = []
    if (Data.header) {
        const Header = {
            type: 'text',
            value: Data.header,
            style: `text-align:center;`,
            css: { "font-weight": "bold", "font-size": "16px" }
        }
        layout.push(Header)
    }
    if (Data.subHeader) {
        const SubHeader = {
            type: 'text',
            value: Data.subHeader,
            style: `text-align:center;`,
            css: { "font-weight": "bold", "font-size": "12px" }
        }
        layout.push(SubHeader)
    }
    if (Data.ClientID) {
        const clientid = {
            type: 'text',
            value: Data.ClientID,
            style: `text-align:center;`,
            css: { "font-size": "11px", "margin": "2px" }
        }
        layout.push(clientid)
    }
    if (Data.DateTime) {
        const Datetime = {
            type: 'text',
            value: Data.DateTime,
            style: `text-align:center;`,
            css: {  "font-size": "10px", "margin": "2px" }
        }
        layout.push(Datetime)
    }

    if (Data.barCode) {
        const BarCode = {
            type: 'barCode',
            value: Data.barCode,
            style: `text-align:center; justify-items: center; justify-content: center; align-items: center;`,
            position: 'center',
            height: 12,
            width: 1,
            displayValue: true,
            fontsize: 8,
        }
        layout.push(BarCode)
    }
    if (Data.Contact) {
        const heading = {
            type: 'text',
            value: `Contact Info` ,
            style: `display: block;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;`,
            css: { "font-weight": "bold", "font-size": "10px", "color": "#666", "line-height": "1.2em", "margin": "2px" }
        }
        layout.push(heading)
        const Address = {
            type: 'text',
            value: `Address : ${Data.Contact.address}` ,
            style: `display: block;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;`,
            css: {"font-size": "10px", "color": "#666", "line-height": "1.2em", "margin": "1px" }
        }
        layout.push(Address)
        const contact = {
            type: 'text',
            value:`Contact : ${Data.Contact.contact}`  ,
            style: `display: block;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;`,
            css: { "font-size": "10px", "color": "#666", "line-height": "1.2em", "margin": "1px" }
        }
        layout.push(contact)
    }

    if (Data.tableHeader && Data.tableBody) {
        const body = []
        Data.tableBody.forEach(element => {
            body.push([element.Item, element.Qnt, element.SubTotal])
        });
        const Table = {
            type: 'table',
            style: 'border: 1px solid #00000000',
            tableHeader: Data.tableHeader,
            tableBody: body,

            tableHeaderStyle: ' color: black; background: #EEE;',

            tableBodyStyle: 'border: 0.5px solid #00000000; color: black;',
            css: {
                "width": "100%",
                "border-collapse": "collapse",
            }
        }
        
        layout.push(Table)
    }
    if(Data.netAmount){
        const Net = {
            type: 'text',
            value: `NET AMOUNT : ${Data.netAmount.toFixed(2)}` ,
            style: `background: #EEE; text-align: end;`,
            css:  { "font-weight": "bold", "font-size": "11px", "margin-top": "2px", 'margin': '0px', "padding":"5px"}
            
        }
        layout.push(Net)
    }
    if(Data.tax){
        const Tax = {
            type: 'text',
            value: `TAX : ${Data.tax.toFixed(2)}` ,
            style: `background: #EEE; text-align: end;`,
            css:  { "font-weight": "bold", "font-size": "10px", 'margin': '0px', "padding":"5px"}
            
        }
        layout.push(Tax)
    }
    if(Data.discount){
        console.log(typeof(Data.discount))
        const Tax = {
            type: 'text',
            value: `DISCOUNT : ${Data.discount.toFixed(2)}` ,
            style: `background: #EEE; text-align: end;`,
            css:  { "font-weight": "bold", "font-size": "10px", 'margin': '0px', "padding":"5px"}
            
        }
        layout.push(Tax)
    }
    if(Data.total){
        const total = {
            type: 'text',
            value: `TOTAL : ${Data.total.toFixed(2)}` ,
            style: `background: #EEE; text-align: end;`,
            css:  { "font-weight": "bold", "font-size": "11px",'margin': '0px' , "padding":"5px"}
            
        }
        layout.push(total)
    }
    if(Data.complementary){
        const total = {
            type: 'text',
            value: `NOW TOTAL : 00.00` ,
            style: `background: #EEE; text-align: end;`,
            css:  { "font-weight": "bold", "font-size": "11px",'margin': '0px' , "padding":"5px"}
            
        }
        layout.push(total)
        const complementary = {
            type: 'text',
            value: `complementary !` ,
            style: ` text-align: center;`,
            css:  { "font-weight": "bold", "font-size": "11px",'margin': '5px' , "padding":"5px"}
            
        }
        layout.push(complementary)
    }
    
    const Footerheading = {
        type: 'text',
        value: `Thank you for Visiting Us!` ,
        style: `display: block;
        text-align:center;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;`,
        css: { "font-weight": "bold", "font-size": "10px", "color": "#666", "line-height": "1.2em", "margin": "2px" , "margin-top": "14px"}
    }
    layout.push(Footerheading)
    const TC = {
        type: 'text',
        value: `Payment is expected within 31 days; please process this invoice within that time. There will be a 5% interest charge per month on late invoices.` ,
        style: `display: block;
        text-align:center;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;`,
        css: { "font-size": "10px", "color": "#666", "line-height": "1.2em", "margin": "2px" }
    }
    layout.push(TC)

    return layout
}