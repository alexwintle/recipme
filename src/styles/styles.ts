import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  loggedInText: {
    marginTop: 32,
    textAlign: 'center',
    fontSize: 18,
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
