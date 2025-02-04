import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Icon({name, size, color}) {

    return (
        <FontAwesome style={{cursor: 'pointer'}} name={name} size={size} color={color} />
    )
}