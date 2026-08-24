import { CircleDotDashed } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../constants/theme';
export function Header() { return <View style={styles.container}><View style={styles.icon}><CircleDotDashed size={22} color={colors.primary} /></View><View><Text style={styles.title}>Calculadora de Bobinas</Text><Text style={styles.subtitle}>Dimensionamento rápido e preciso</Text></View></View>; }
const styles=StyleSheet.create({container:{flexDirection:'row',alignItems:'center',gap:spacing.md},icon:{width:44,height:44,borderRadius:radius.md,backgroundColor:colors.surface,borderWidth:1,borderColor:colors.border,alignItems:'center',justifyContent:'center'},title:{fontSize:20,fontWeight:'800',color:colors.textPrimary},subtitle:{fontSize:12,color:colors.textSecondary,marginTop:3}});
export default Header;
