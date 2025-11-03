import {AppBar, Container, IconButton, Switch, Toolbar} from "@mui/material";
import {NavButton} from "@/common/components/NavButton/NavButton.ts";
import MenuIcon from '@mui/icons-material/Menu'
import {changeThemeModeAC} from "@/app/app-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {getTheme} from "@/common/theme/theme.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectThemeMode} from "@/app/app-selectors.ts";
import {containerSx} from "@/common/styles/container.styles.ts";


const Header = () => {

    const themeMode = useAppSelector(selectThemeMode)

    const dispatch = useAppDispatch()

    const theme = getTheme(themeMode);

    const changeModeHandler = () => {
        const newThemeMode = themeMode === 'light' ? 'dark' : 'light'
        dispatch(changeThemeModeAC({themeMode: newThemeMode}))
    }

    return (
        <AppBar position={'static'} sx={{'mb': '30px'}}>

            <Toolbar>
                <Container maxWidth={'lg'} sx={containerSx}>
                    <IconButton color={'inherit'}>
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <NavButton>Sign in</NavButton>
                        <NavButton>Sign up</NavButton>
                        <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                        <Switch color={'default'} onChange={changeModeHandler}/>
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default Header;