import { Search } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'

const SearchBar = () => {
  return (
    <TextField
      id='outlined-basic'
      label='Search'
      variant='outlined'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <Search />
          </InputAdornment>
        ),
      }}></TextField>
  )
}

export default SearchBar
