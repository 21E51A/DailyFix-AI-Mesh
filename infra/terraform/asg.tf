/* resource "aws_launch_template" "app_lt" {
  name_prefix   = "dailyfix-app-"
  image_id      = "ami-0f5ee92e2d63afc18"
  instance_type = "t3.medium"
  key_name      = "mykeyec2"

  vpc_security_group_ids = [aws_security_group.app_sg.id]

  user_data = base64encode(<<EOF
#!/bin/bash
yum update -y
# install docker / backend startup here
EOF
  )
}

resource "aws_autoscaling_group" "app_asg" {
  desired_capacity     = 2
  max_size             = 3
  min_size             = 1
  vpc_zone_identifier  = [
    aws_subnet.private-1.id,
    aws_subnet.private-2.id
  ]

  target_group_arns = [aws_lb_target_group.app_tg.arn]

  launch_template {
    id      = aws_launch_template.app_lt.id
    version = "$Latest"
  }

  tag {
    key                 = "Name"
    value               = "dailyfix-app"
    propagate_at_launch = true
  }
}
 */