import styles from './App.module.css'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectThemeMode} from "./app-selectors.ts";
import {getTheme} from "../common/theme/theme.ts";
import Header from "@/common/components/Header/Header.tsx";
import Main from "@/app/Main.tsx";

function App() {

    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode);

    return (
        <ThemeProvider theme={theme}>

            <div className={styles.app}>
                <CssBaseline/>
                <Header/>
                <Main/>
            </div>
        </ThemeProvider>
    )
}

export default App
