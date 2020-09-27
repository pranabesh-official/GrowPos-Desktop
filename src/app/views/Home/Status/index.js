import React, { useContext, useState , useEffect} from 'react'
import { Grid } from '@material-ui/core'
import StatusCard from '../../../components/DashbordStatus'
import Support from '../../../components/Support'
import ShopInfo from '../../../components/ShopInfo'
import { ShopHandeler } from '../../../LocalDB/ShopDB'
import { DataContext } from '../../../LocalDB'

const StatusLayout = (props) => {
    const initialFValues = {
        Income: '0.00',
        Expence: '0.00',
        Diposite: '0.00',
        Blance:'0.00'
    }
    const [SaleData, setSaleData] = useState(initialFValues)
    const { ShopData } = useContext(ShopHandeler)
    const { Registers } = useContext(DataContext)

    useEffect(() => {
        let Income = 0
        let Expence = 0
        let Diposite = 0
        Registers.forEach(element => {
            Income = Income + element.Income
            Expence = Expence + element.Expence
            Diposite = Diposite + element.Diposite
        });
        const Balnce =  (Number(Income) + Number(Diposite)) - Number(Expence)
        setSaleData({
            Income: Number(Income).toFixed(2),
            Expence: Number(Expence).toFixed(2),
            Diposite: Number(Diposite).toFixed(2),
            Blance: Balnce.toFixed(2)
        })
    }, [Registers])
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
                <Grid container spacing={1}>
                    <Grid item xs={3} sm={3}>
                        <StatusCard
                            Type='Today'
                            display="Total Sale"
                            label={SaleData.Blance}
                        />
                    </Grid>
                    <Grid item xs={3} sm={3}>
                        <StatusCard
                            Type='Total'
                            display="Cash Balance"
                            label={SaleData.Income}
                        />
                    </Grid>
                    <Grid item xs={3} sm={3}>
                        <StatusCard
                            Type='Expence'
                            display="Expence"
                            label={SaleData.Expence}
                        />
                    </Grid>
                    <Grid item xs={3} sm={3}>
                        <StatusCard
                            Type='Diposite'
                            display="Diposite"
                            label={SaleData.Diposite}
                        />
                    </Grid>
                    <Grid item xs={8} sm={8}>
                        <Support
                            label="Need help or support?"
                            sublabel={`
                            Caontact : 9064898395,9732894841 ,
                            https://www.facebook.com/samu.sarkar2
                            `}
                        />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <ShopInfo
                            Name={ShopData.Name && ShopData.Name}
                            Contact={ShopData && ShopData.Contact}
                            Location={ShopData.Location && ShopData.Location}
                        />
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    )
}

export default StatusLayout