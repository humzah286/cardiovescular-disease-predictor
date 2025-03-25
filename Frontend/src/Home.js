
import Typography from '@material-ui/core/Typography';

const BackgroundColor = "#3d3d3d";

const OverallTextColor = {
    color: "#FFFFFF"
}

const OverallFontFamily = {
    fontFamily: "Rubik_Doodle"
}

const Home = () => {
    return (
        <div className="home" style={{ backgroundColor: BackgroundColor}}>
            <div style={{height: "90px"}}></div>

            <div style={{}}>
            <Typography variant="h1" component="h6" color="initial" style={{fontSize: "60px", ...OverallTextColor, ...OverallFontFamily}}>Cardio-vascular disease predictor</Typography>

            <div style={{height: "70px"}}></div>

            <Typography variant="h2" color="initial" style={{fontSize: "40px", ...OverallTextColor, ...OverallFontFamily}}>Project made by: </Typography>
            <div style={{height: "20px"}}></div>
            <Typography variant="h4" color="initial" style={{fontSize: "30px", ...OverallTextColor, ...OverallFontFamily}}>Humzah Siddiqi</Typography>
            <div style={{height: "20px"}}></div>
            <Typography variant="h4" color="initial" style={{fontSize: "30px", ...OverallTextColor, ...OverallFontFamily}}>Amad Ahmed Siddiqui</Typography>
            <div style={{height: "20px"}}></div>
            <Typography variant="h4" color="initial" style={{fontSize: "30px", ...OverallTextColor, ...OverallFontFamily}}>Shahzaib Ijaz</Typography>
            <div style={{height: "20px"}}></div>
            <Typography variant="h4" color="initial" style={{fontSize: "30px", ...OverallTextColor, ...OverallFontFamily}}>Immar Karim Unnar</Typography>
            <div style={{height: "20px"}}></div>
            <Typography variant="h4" color="initial" style={{fontSize: "30px", ...OverallTextColor, ...OverallFontFamily}}>Khalid Khan</Typography>
            <div style={{height: "70px"}}></div>
            

            </div>
        </div>
    );
}

export default Home;