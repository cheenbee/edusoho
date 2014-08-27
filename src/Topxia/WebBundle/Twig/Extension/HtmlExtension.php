<?php
namespace Topxia\WebBundle\Twig\Extension;

use Topxia\WebBundle\Twig\Extension\DataDict;
use Topxia\Service\Common\ServiceKernel;

class HtmlExtension extends \Twig_Extension
{

    public function getFunctions()
    {
        $options = array('is_safe' => array('html'));
        return array(
            new \Twig_SimpleFunction('select_options', array($this, 'selectOptions'), $options),
            new \Twig_SimpleFunction('radios', array($this, 'radios'), $options),
            new \Twig_SimpleFunction('checkboxs', array($this, 'checkboxs'), $options),
            new \Twig_SimpleFunction('field_value', array($this, 'fieldValue'), $options),
            new \Twig_SimpleFunction('select_options_for_school', array($this, 'selectOptions2'), $options),
        );
    }

    /**
     * 这个不要使用，要废弃
     */
    public function fieldValue($object, $key, $default = '')
    {
        $html = '';
        if (empty($object)) {
            return $default;
        }

        if (!is_array($object) or !isset($object[$key])) {
            return $default;
        }

        return $object[$key];
    }

    public function selectOptions($choices, $selected = null, $empty = null)
    {
        $html = '';
        if (!is_null($empty)) {
            $html .= "<option value=\"\">{$empty}</option>";
        }
        foreach ($choices as $value => $name) {
            if ($selected == $value) {
                $html .= "<option value=\"{$value}\" selected=\"selected\">{$name}</option>";
            } else {
                $html .= "<option value=\"{$value}\">{$name}</option>";
            }
        }

        return $html;
    }

    public function selectOptions2($choices, $selected = null, $empty = null)
    {
        $html = '';
        if (!is_null($empty)) {
            $html .= "<option value=\"\">{$empty}</option>";
        }

        $school = ServiceKernel::instance()
        ->createService('System.SettingService')->get('school');

        $choices = array();
        $primarySchool = array();
        $middleSchool = array();
        $highSchool = array();

        $dict = new DataDict();
        if(!empty($school['primarySchool'])) {
            if($school['primaryYear'] == '6'){
                $primarySchool = DataDict::dict('primarySchool');
            }else{
                $primarySchool = DataDict::dict('primarySchool');
                unset($primarySchool[6]);
            }

        }

        if(!empty($school['middleSchool'])) {
            $middleSchool = DataDict::dict('middleSchool');
        }

        if(!empty($school['highSchool'])) {
            $highSchool = DataDict::dict('highSchool');
        }

        $choices = array_merge($primarySchool, $middleSchool, $highSchool);

        foreach ($choices as $value => $name) {
            if ($selected === $value) {
                $html .= "<option value=\"{$value}\" selected=\"selected\">{$name}</option>";
            } else {
                $html .= "<option value=\"{$value}\">{$name}</option>";
            }
        }

        return $html;
    }
    public function radios($name, $choices, $checked = null)
    {
        $html = '';
        foreach ($choices as $value => $label) {
            if ($checked == $value) {
                $html .= "<label><input type=\"radio\" name=\"{$name}\" value=\"{$value}\" checked=\"checked\"> {$label}</label>";
            } else {
                $html .= "<label><input type=\"radio\" name=\"{$name}\" value=\"{$value}\"> {$label}</label>";
            }
        }
        return $html;
    }

    public function checkboxs($name, $choices, $checkeds = array())
    {
        $html = '';
        if (!is_array($checkeds)) {
            $checkeds = array($checkeds);
        }

        foreach ($choices as $value => $label) {
            if (in_array($value, $checkeds)) {
                $html .= "<label><input type=\"checkbox\" name=\"{$name}[]\" value=\"{$value}\" checked=\"checked\"> {$label}</label>";
            } else {
                $html .= "<label><input type=\"checkbox\" name=\"{$name}[]\" value=\"{$value}\"> {$label}</label>";
            }
        }
        return $html;
    }

    public function getName ()
    {
        return 'topxia_html_twig';
    }

}